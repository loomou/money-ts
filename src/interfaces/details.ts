export interface Record {
  icon: string,
  note: string,
  type: string,
  amount: number,
  createdAt: Date | string,
  id?: string | number,
}

export interface recordStoreState {
  recordList: Record[],
  currentList: Record,
  filterList: Record[],
  setRecord: Record,
  staType: 'pay',
  staDate: Date | string,
  headerDate: Date | string,
  tagsShow: Boolean,
  xxx: Record[],
  filterType: String,
  filterDate: Date | string,
}


