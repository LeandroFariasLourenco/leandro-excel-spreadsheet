import { ITableData } from "../../models";

class TableService {
  private storageKey = 'table-data';

  public saveTableData(tableData: ITableData) {
    localStorage.setItem(this.storageKey, JSON.stringify(tableData));
  }

  public getTableData(): ITableData | null {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  public deleteTableData(): void {
    localStorage.removeItem(this.storageKey);
  }
}

const instance = new TableService();

export default instance;
