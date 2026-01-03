import { Text, View, TextInput, Pressable, Stylesheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "../data/todos";
import { useState } from "react";

export default function Index() {
  const[todos,setTodos]=useState(data.sort((a,b)=>a.id-b.id));
  const [text,setText]=useState("");

  const addTodo=()=>{
    if(text.trim()){
      const newId=todos.length>0 ? todos[todos.length-1].id +1 : 1;
      setTodos([{id:newId,title:text,completed:false},...todos]);
      setText("")
    }
  }

  const toggleTodo=(id)=>{
    setTodos(todos.map(todo=>todo.id===id ? {...todo,completed:!todo.completed} : todo));
  }

  const removeTodo=(id)=>{
    setTodos(todos.filter(todo=>todo.id!==id));
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onchangeText={setText}
        />
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles=Stylesheet.create({
  container:{
    flex:1,
    backgroundColor:"black"
  },
  inputContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:10,
    padding:10,
    width:"100%",
    maxWidth:1024,
    marginHorizontal:"auto",
    PointerEvent:"auto"
  },
  input:{
    flex:1,
    borderColor:"gray",
    borderWidth:1,
    borderRadius:5,
    padding:10,
    marginRight:10,
    fontSize:16,
    minWidth:0,
    color:"white",
  },
  addButton:{
    backgroundColor:"White",
    borderRadius:5,
    padding:10,
  },
  addButtonText:{
    fontSize:16,
    color:"black",
  }
})
