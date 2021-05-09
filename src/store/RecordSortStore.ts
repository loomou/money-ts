// @ts-ignore
import clone from '../libs/clone';
import dayjs from 'dayjs';
import {RootState} from '@/interfaces/rootState';
import {Record} from '@/interfaces/details';
import {TypeDate,GetterDate} from '@/interfaces/rootState';

const state = () => ({});

const getters = {
  filterTypeDate(state: any, getter: any, rootState: any) {
    const ddd = clone(rootState.RecordStore.recordList);
    rootState.RecordStore.filterList = ddd.filter((t: Record) => {
      if (rootState.RecordStore.filterType === 'All') return true;
      return t.icon === rootState.RecordStore.filterType;
    }).filter((y: Record) => {
      if (dayjs(rootState.RecordStore.filterDate).isSame((new Date()), 'month')) return true;
      return dayjs(y.createdAt).isSame(dayjs(rootState.RecordStore.filterDate), 'month');
    }).sort((a: Record, b: Record) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    return rootState.RecordStore.filterList;
  },

  dateSort(state: any, getters: any) {
    const recordList = clone(getters.filterTypeDate);
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList).sort((a: Record, b: Record) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    const groupList = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = groupList[groupList.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        groupList.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    return groupList;
  },

  monthSort(state: any, getters: any, rootState: any) {
    const groupList = getters.dateSort;
    const sss = clone(rootState.RecordStore.filterList);
    if (sss.length === 0) {
      return;
    }
    const recordList = rootState.RecordStore.filterList;
    const newList = clone(recordList).sort((a: Record, b: Record) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    const monthList = [{title: dayjs(newList[0].createdAt).format('YYYY-MM'), items: [groupList[0]]}];
    for (let i = 1; i < groupList.length; i++) {
      const current = groupList[i];
      const last = monthList[monthList.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.title), 'month')) {
        last.items.push(current);
      } else {
        monthList.push({title: dayjs(current.title).format('YYYY-MM'), items: [current]});
      }
    }
    return monthList;
  },

  monthTotal(state: any, getters: any, rootState: any) {
    let qqq = 0, www = 0;
    const ttt = clone(getters.filterTypeDate);
    if (ttt.length === 0) {
      rootState.RecordStore.headerDate = new Date();
      return {qqq, www};
    }
    rootState.RecordStore.headerDate = ttt[0].createdAt;
    const uuu = ttt.filter((t: Record) => dayjs(t.createdAt).isSame(ttt[0].createdAt, 'month'));
    const iii = uuu.filter((t: Record) => t.type === 'pay');
    const ooo = uuu.filter((t: Record) => t.type === 'income');
    for (let i = 0; i < iii.length; i++) {
      qqq = qqq + iii[i].amount;
    }
    for (let i = 0; i < ooo.length; i++) {
      www = www + ooo[i].amount;
    }
    return {qqq, www};
  }
};

export default {
  namespaced: true,
  state,
  getters
};
