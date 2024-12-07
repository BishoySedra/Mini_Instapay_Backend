export interface Observer {
  update(event: string, data: any): void;
}
