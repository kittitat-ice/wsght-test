import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addSubTask,
  addTodoTask,
  removeSubTask,
  selectTodoReducer,
  setTodoList,
} from '../redux/slices/TodoSlice';
import Dot from '../components/common/Dot';
import {getFullDate, randomInRange, randomText} from '../utils/function';

const Home = props => {
  const dispatch = useDispatch();
  const {todoList, subTasks} = useSelector(selectTodoReducer);
  const [sortedTodoList, setSortedTodoList] = useState([]);

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

  const onDeletePress = id => {
    if (!id) return;
    const newTodoList = todoList.filter(item => item.id !== id);
    dispatch(setTodoList(newTodoList));
  };

  const onSubTaskDeletePress = (id, subTaskId) => {
    if (!id || !subTaskId) return;
    dispatch(removeSubTask({id, subTaskId}));
  };

  // ADD SUB TASK
  const onAddSubTaskPress = id => {
    const thisTask = subTasks[id] || [];
    const newTask = {
      id: randomText(12),
      title: `newsubtask ${thisTask.length + 1}`,
      desc: `desc ${thisTask.length + 1}`,
      dueDate: new Date(randomInRange(0, 2147483647) * 1000).getTime() / 1000,
    };
    dispatch(addSubTask({id: id, task: newTask}));
  };

  // ADD TASK
  const onFabPress = () => {
    const newTask = {
      id: randomText(12),
      title: `newtask ${todoList.length + 1}`,
      desc: `desc ${todoList.length + 1}`,
      dueDate: new Date(randomInRange(0, 2147483647) * 1000).getTime() / 1000,
    };
    dispatch(addTodoTask(newTask));
  };

  const renderItem = ({item, index}) => {
    const mainDate = new Date(item.dueDate * 1000);
    const dateStr = getFullDate(mainDate, true, true);
    const thisRowSubTasks = subTasks[item.id];
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.mainTaskContainer}>
          <View style={styles.mainTaskTitle}>
            <Dot size={20} color={'blue'} />
            <Text style={styles.listItemTitle}>{item.title}</Text>
          </View>
          <Text style={styles.listItemDate}>{dateStr}</Text>
          <TouchableOpacity
            onPress={() => onDeletePress(item.id)}
            style={styles.listItemDeleteButton}>
            <Text style={styles.listItemDeleteButtonText}>{'Del'}</Text>
          </TouchableOpacity>
        </View>
        {thisRowSubTasks &&
          thisRowSubTasks.map((subtask, i) => (
            <View style={styles.mainTaskContainer}>
              <View style={styles.subTaskTitle}>
                <Dot size={12} color={'black'} />
                <Text style={styles.listItemTitle}>{subtask.title}</Text>
              </View>
              <TouchableOpacity
                onPress={() => onSubTaskDeletePress(item.id, subtask.id)}
                style={styles.listItemDeleteButton}>
                <Text style={styles.listItemDeleteButtonText}>{'Del'}</Text>
              </TouchableOpacity>
            </View>
          ))}
        <View
          style={{
            height: 1,
            flex: 1,
            backgroundColor: '#aaa',
          }}
        />
        <TouchableOpacity
          onPress={() => onAddSubTaskPress(item.id)}
          style={styles.addTaskTitle}>
          <Text>{'+ add subtask'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={sortedTodoList}
        renderItem={renderItem}
        ItemSeparatorComponent={<View style={{height: 12}} />}
      />
      <TouchableOpacity onPress={onFabPress} style={styles.fab}>
        <Text maxFontSizeMultiplier={1} style={styles.fabText}>
          {'+'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: 'white',
  },
  fab: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 2,

    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowColor: '#555',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: '#aaaaff',
  },
  fabText: {
    fontSize: 32,
    color: 'white',
  },
  listItemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  listItemDate: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  mainTaskContainer: {
    flexDirection: 'row',
    columnGap: 8,
  },
  mainTaskTitle: {
    flex: 1,
    columnGap: 8,
    flexDirection: 'row',
    paddingVertical: 8,
    marginStart: 12,
    alignItems: 'center',
  },
  subTaskTitle: {
    flex: 1,
    columnGap: 8,
    flexDirection: 'row',
    paddingVertical: 8,
    marginStart: 24,
    alignItems: 'center',
  },
  addTaskTitle: {
    flex: 1,
    columnGap: 8,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingStart: 24,
    alignItems: 'center',
  },
  listItemTitle: {
    fontSize: 18,
  },
  listItemDeleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AAA',
  },
  listItemDeleteButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
