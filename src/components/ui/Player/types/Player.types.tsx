export interface PlayerNavigationItem {
  src: string;
  label: string | null;
  index: number;
}

export interface PlayerNavigationCategory {
  title: string | null;
  items: PlayerNavigationItem[];
}
