export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      anime_categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          slug?: string
        }
        Relationships: []
      }
      anime_category_list: {
        Row: {
          anime_id: number
          category_id: number | null
          created_at: string
          id: number
        }
        Insert: {
          anime_id: number
          category_id?: number | null
          created_at?: string
          id?: number
        }
        Update: {
          anime_id?: number
          category_id?: number | null
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "anime_category_list_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anime_category_list_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "anime_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      anime_list: {
        Row: {
          age: number | null
          cover_image: string | null
          created_at: string
          current_episode: number | null
          description: string | null
          id: number
          image: string | null
          name: string
          origin_url: string | null
          total_episodes: number | null
          year: number | null
        }
        Insert: {
          age?: number | null
          cover_image?: string | null
          created_at?: string
          current_episode?: number | null
          description?: string | null
          id?: number
          image?: string | null
          name: string
          origin_url?: string | null
          total_episodes?: number | null
          year?: number | null
        }
        Update: {
          age?: number | null
          cover_image?: string | null
          created_at?: string
          current_episode?: number | null
          description?: string | null
          id?: number
          image?: string | null
          name?: string
          origin_url?: string | null
          total_episodes?: number | null
          year?: number | null
        }
        Relationships: []
      }
      anime_productions: {
        Row: {
          anime_id: number | null
          created_at: string
          episode_count: number | null
          id: number
          title: string | null
        }
        Insert: {
          anime_id?: number | null
          created_at?: string
          episode_count?: number | null
          id?: number
          title?: string | null
        }
        Update: {
          anime_id?: number | null
          created_at?: string
          episode_count?: number | null
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "anime_series_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime_list"
            referencedColumns: ["id"]
          },
        ]
      }
      anime_sources: {
        Row: {
          created_at: string
          episode: number
          id: number
          label: string | null
          production_id: number | null
          url: string
        }
        Insert: {
          created_at?: string
          episode: number
          id?: number
          label?: string | null
          production_id?: number | null
          url: string
        }
        Update: {
          created_at?: string
          episode?: number
          id?: number
          label?: string | null
          production_id?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "anime_sources_production_id_fkey"
            columns: ["production_id"]
            isOneToOne: false
            referencedRelation: "anime_productions"
            referencedColumns: ["id"]
          },
        ]
      }
      anime_statuses: {
        Row: {
          created_at: string
          description_key: string
          id: number
          name_key: string
          type: string
        }
        Insert: {
          created_at?: string
          description_key: string
          id?: number
          name_key: string
          type: string
        }
        Update: {
          created_at?: string
          description_key?: string
          id?: number
          name_key?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
