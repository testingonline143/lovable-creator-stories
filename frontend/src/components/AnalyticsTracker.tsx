import { ReactNode, cloneElement, isValidElement } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsTrackerProps {
  children: ReactNode;
  linkType: 'website' | 'social' | 'course_url' | 'contact';
  linkUrl: string;
  sourcePage: string;
  resourceId?: string;
  className?: string;
}

export const AnalyticsTracker = ({ 
  children, 
  linkType, 
  linkUrl, 
  sourcePage, 
  resourceId,
  className 
}: AnalyticsTrackerProps) => {
  const { trackLinkClick } = useAnalytics();

  const handleClick = () => {
    trackLinkClick({
      link_type: linkType,
      link_url: linkUrl,
      source_page: sourcePage,
      resource_id: resourceId
    });
  };

  // If children is a valid React element, clone it with onClick handler
  if (isValidElement(children)) {
    const childProps = children.props as any;
    return cloneElement(children, {
      ...childProps,
      onClick: (e: any) => {
        // Call original onClick if it exists
        if (childProps.onClick) {
          childProps.onClick(e);
        }
        handleClick();
      },
      className: className || childProps.className
    } as any);
  }

  // Fallback for non-React elements
  return (
    <span onClick={handleClick} className={className}>
      {children}
    </span>
  );
};