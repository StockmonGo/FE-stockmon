export interface IModal {
  isOpen: boolean;
  content: string;
  title?: string;
  onClick: () => void;
}
