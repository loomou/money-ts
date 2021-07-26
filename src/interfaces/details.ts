import dayjs from 'dayjs';

export interface Record {
  icon: string,
  note: string,
  type: string,
  amount: number,
  createdAt: Date | string | dayjs.Dayjs,
  id?: string | number,
}

export interface recordStoreState {
  recordList: Record[],
  currentList: Record,
  filterList: Record[],
  setRecord: Record,
  staType: 'pay',
  staDate: Date | string,
  headerDate: Date | string | dayjs.Dayjs,
  filterType: String,
  filterDate: Date | string,
}


