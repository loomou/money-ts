import {Record, recordStoreState} from '@/interfaces/details';
import {Tags} from '@/interfaces/tags';

export interface RootState {
  RecordStore: recordStoreState;
  tagState: Tags;
}

export interface TypeDate {
  filterTypeDate: Record[]
}

export interface GetterDate {
  dateSort: { title: string, items: Record[] }[] | undefined
}

export interface GetterMonth {

}
