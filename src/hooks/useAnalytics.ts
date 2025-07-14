import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageViewData {
  page_type: 'creator' | 'course' | 'story' | 'directory' | 'home';
  resource_id?: string;
}

interface LinkClickData {
  link_type: 'website' | 'social' | 'course_url' | 'contact';
  link_url: string;
  source_page: string;
  resource_id?: string;
}

// Hash IP address for privacy
const hashIP = async (ip: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Get user's IP address (simplified - in production you'd use a service)
const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
};

// Get country code from IP (simplified)
const getCountryCode = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0] || 'unknown';
  } catch {
    return 'unknown';
  }
};

export const usePageView = (data: PageViewData) => {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const ip = await getUserIP();
        const ipHash = await hashIP(ip);
        
        await supabase.from('page_views').insert({
          page_type: data.page_type,
          resource_id: data.resource_id || null,
          user_agent: navigator.userAgent,
          referrer: document.referrer,
          ip_hash: ipHash,
          country_code: getCountryCode()
        });
      } catch (error) {
        console.warn('Analytics tracking failed:', error);
      }
    };

    // Delay tracking to avoid tracking bots
    const timeout = setTimeout(trackPageView, 1000);
    return () => clearTimeout(timeout);
  }, [data.page_type, data.resource_id]);
};

export const useAnalytics = () => {
  const trackLinkClick = async (data: LinkClickData) => {
    try {
      const ip = await getUserIP();
      const ipHash = await hashIP(ip);
      
      await supabase.from('link_clicks').insert({
        link_type: data.link_type,
        link_url: data.link_url,
        source_page: data.source_page,
        resource_id: data.resource_id || null,
        user_agent: navigator.userAgent,
        ip_hash: ipHash,
        country_code: getCountryCode()
      });
    } catch (error) {
      console.warn('Link click tracking failed:', error);
    }
  };

  return { trackLinkClick };
};