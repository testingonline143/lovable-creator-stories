export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      course_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          certificate_issued: boolean | null
          completed_at: string | null
          course_id: string
          enrolled_at: string
          id: string
          last_accessed_at: string | null
          progress_percentage: number | null
          user_id: string
        }
        Insert: {
          certificate_issued?: boolean | null
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          user_id: string
        }
        Update: {
          certificate_issued?: boolean | null
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_reviews: {
        Row: {
          course_id: string
          created_at: string
          enrollment_id: string | null
          helpful_votes: number | null
          id: string
          is_verified: boolean | null
          rating: number
          review_text: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string
          enrollment_id?: string | null
          helpful_votes?: number | null
          id?: string
          is_verified?: boolean | null
          rating: number
          review_text?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string
          enrollment_id?: string | null
          helpful_votes?: number | null
          id?: string
          is_verified?: boolean | null
          rating?: number
          review_text?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      course_wishlist: {
        Row: {
          added_at: string
          course_id: string
          id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          course_id: string
          id?: string
          user_id: string
        }
        Update: {
          added_at?: string
          course_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_wishlist_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          average_rating: number | null
          category: string
          course_url: string | null
          cover_image_url: string | null
          created_at: string
          creator_id: string
          currency: string
          description: string | null
          difficulty: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours: number | null
          id: string
          is_featured: boolean | null
          language: string | null
          launch_date: string | null
          learning_outcomes: string[] | null
          original_price: number | null
          platform: string | null
          prerequisites: string[] | null
          price: number
          short_description: string | null
          slug: string | null
          status: Database["public"]["Enums"]["course_status"]
          tags: string[] | null
          title: string
          total_lessons: number | null
          total_reviews: number | null
          total_students: number | null
          trailer_video_url: string | null
          updated_at: string
        }
        Insert: {
          average_rating?: number | null
          category: string
          course_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          creator_id: string
          currency?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours?: number | null
          id?: string
          is_featured?: boolean | null
          language?: string | null
          launch_date?: string | null
          learning_outcomes?: string[] | null
          original_price?: number | null
          platform?: string | null
          prerequisites?: string[] | null
          price?: number
          short_description?: string | null
          slug?: string | null
          status?: Database["public"]["Enums"]["course_status"]
          tags?: string[] | null
          title: string
          total_lessons?: number | null
          total_reviews?: number | null
          total_students?: number | null
          trailer_video_url?: string | null
          updated_at?: string
        }
        Update: {
          average_rating?: number | null
          category?: string
          course_url?: string | null
          cover_image_url?: string | null
          created_at?: string
          creator_id?: string
          currency?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours?: number | null
          id?: string
          is_featured?: boolean | null
          language?: string | null
          launch_date?: string | null
          learning_outcomes?: string[] | null
          original_price?: number | null
          platform?: string | null
          prerequisites?: string[] | null
          price?: number
          short_description?: string | null
          slug?: string | null
          status?: Database["public"]["Enums"]["course_status"]
          tags?: string[] | null
          title?: string
          total_lessons?: number | null
          total_reviews?: number | null
          total_students?: number | null
          trailer_video_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          achievements: string[] | null
          avatar_url: string | null
          badge_text: string | null
          bio: string | null
          cover_image_url: string | null
          created_at: string
          id: string
          is_public: boolean | null
          linkedin_url: string | null
          location: string | null
          monthly_revenue: number | null
          name: string
          slug: string | null
          social_links: Json | null
          title: string | null
          total_courses: number | null
          total_students: number | null
          twitter_handle: string | null
          updated_at: string
          user_id: string
          website: string | null
          year_started: number | null
        }
        Insert: {
          achievements?: string[] | null
          avatar_url?: string | null
          badge_text?: string | null
          bio?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          monthly_revenue?: number | null
          name: string
          slug?: string | null
          social_links?: Json | null
          title?: string | null
          total_courses?: number | null
          total_students?: number | null
          twitter_handle?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
          year_started?: number | null
        }
        Update: {
          achievements?: string[] | null
          avatar_url?: string | null
          badge_text?: string | null
          bio?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_public?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          monthly_revenue?: number | null
          name?: string
          slug?: string | null
          social_links?: Json | null
          title?: string | null
          total_courses?: number | null
          total_students?: number | null
          twitter_handle?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
          year_started?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      story_reviews: {
        Row: {
          action: string
          created_at: string
          feedback: string | null
          id: string
          reviewer_id: string | null
          story_id: string
        }
        Insert: {
          action: string
          created_at?: string
          feedback?: string | null
          id?: string
          reviewer_id?: string | null
          story_id: string
        }
        Update: {
          action?: string
          created_at?: string
          feedback?: string | null
          id?: string
          reviewer_id?: string | null
          story_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_reviews_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "story_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      story_sections: {
        Row: {
          content: string | null
          created_at: string
          id: string
          metadata: Json | null
          section_type: string
          sort_order: number
          story_id: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          section_type: string
          sort_order?: number
          story_id: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          section_type?: string
          sort_order?: number
          story_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_sections_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "story_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      story_submissions: {
        Row: {
          admin_notes: string | null
          category: Database["public"]["Enums"]["story_category"]
          created_at: string
          creator_id: string | null
          featured_image_url: string | null
          id: string
          key_metrics: Json | null
          published_at: string | null
          revenue_after: number | null
          revenue_before: number | null
          reviewed_at: string | null
          slug: string | null
          status: Database["public"]["Enums"]["story_status"]
          submitted_at: string | null
          subtitle: string | null
          tags: string[] | null
          timeframe_end: string | null
          timeframe_start: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          category?: Database["public"]["Enums"]["story_category"]
          created_at?: string
          creator_id?: string | null
          featured_image_url?: string | null
          id?: string
          key_metrics?: Json | null
          published_at?: string | null
          revenue_after?: number | null
          revenue_before?: number | null
          reviewed_at?: string | null
          slug?: string | null
          status?: Database["public"]["Enums"]["story_status"]
          submitted_at?: string | null
          subtitle?: string | null
          tags?: string[] | null
          timeframe_end?: string | null
          timeframe_start?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          category?: Database["public"]["Enums"]["story_category"]
          created_at?: string
          creator_id?: string | null
          featured_image_url?: string | null
          id?: string
          key_metrics?: Json | null
          published_at?: string | null
          revenue_after?: number | null
          revenue_before?: number | null
          reviewed_at?: string | null
          slug?: string | null
          status?: Database["public"]["Enums"]["story_status"]
          submitted_at?: string | null
          subtitle?: string | null
          tags?: string[] | null
          timeframe_end?: string | null
          timeframe_start?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_submissions_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      course_difficulty: "beginner" | "intermediate" | "advanced"
      course_status: "draft" | "published" | "archived"
      story_category:
        | "course_creation"
        | "coaching"
        | "digital_products"
        | "saas"
        | "consulting"
        | "content_creation"
        | "ecommerce"
        | "other"
      story_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      course_difficulty: ["beginner", "intermediate", "advanced"],
      course_status: ["draft", "published", "archived"],
      story_category: [
        "course_creation",
        "coaching",
        "digital_products",
        "saas",
        "consulting",
        "content_creation",
        "ecommerce",
        "other",
      ],
      story_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "published",
      ],
    },
  },
} as const
