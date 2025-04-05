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
      anime_series: {
        Row: {
          anime_id: number | null
          created_at: string
          episode_count: number | null
          id: number
          release_date: string | null
          season_number: number | null
          title: string | null
        }
        Insert: {
          anime_id?: number | null
          created_at?: string
          episode_count?: number | null
          id?: number
          release_date?: string | null
          season_number?: number | null
          title?: string | null
        }
        Update: {
          anime_id?: number | null
          created_at?: string
          episode_count?: number | null
          id?: number
          release_date?: string | null
          season_number?: number | null
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
          id: number
          label: string | null
          production: string | null
          series_id: number | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          label?: string | null
          production?: string | null
          series_id?: number | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          label?: string | null
          production?: string | null
          series_id?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "anime_sources_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "anime_series"
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
