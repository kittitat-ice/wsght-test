import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {selectTodoReducer} from '../redux/slices/TodoSlice';
import {useSelector} from 'react-redux';
import {getFullDate} from '../utils/function';

const Summary = props => {
  const {todoList, subTasks} = useSelector(selectTodoReducer);
  const [sortedTodoList, setSortedTodoList] = useState([]);
  const [totalSub, setTotalSub] = useState(0);

  useEffect(() => {
    const newList = [...todoList];

    // sort closest to now
    newList.sort((a, b) => {
      const now = new Date().getTime() / 1000;
      const aDiff = Math.abs(now - a.dueDate);
      const bDiff = Math.abs(now - b.dueDate);
      return aDiff - bDiff;
    });
    setSortedTodoList(newList);
    return () => {};
  }, [todoList]);

  useEffect(() => {
    let total = 0;
    for (const id in subTasks) {
      total += subTasks[id].length;
    }
    setTotalSub(total);
  }, [subTasks]);

  const onPress = () => {
    props.navigation.navigate('Home');
    // TODO
    // scroll to row
  };

  const renderItem = ({item, index}) => {
    const mainDate = new Date(item.dueDate * 1000);
    const dateStr = getFullDate(mainDate, true, true);
    return (
      <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
        <Text style={styles.mainTask}>{item.title}</Text>
        <Text style={styles.listItemDate}>{dateStr}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{marginHorizontal: 20}}>
          <Text>{`Total Tasks : ${todoList.length}`}</Text>
          <Text>{`Total Sub Tasks : ${totalSub}`}</Text>
        </View>
        <FlatList
          data={sortedTodoList}
          renderItem={renderItem}
          ItemSeparatorComponent={<View style={{height: 12}} />}
          ListHeaderComponent={<View style={{height: 20}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  mainTask: {
    flex: 1,
    fontSize: 18,
  },
  listItemDate: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
