export interface Ibox {
  label: string;
  type: string;
  handleChange: (key: string, value: string) => void;
}
export interface AddE {
  isOpen: any;
  onClose: any;
  onEventAdded: any;
}
