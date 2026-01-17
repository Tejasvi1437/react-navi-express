import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../components/button-component";
import CrudCard from "../components/crud-card";
import api from "../utils/api";

export default function Index() {
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    console.log("welcome");
    try {
      const response = await api.get("/usr");
      console.log("response", response.data);
      setUsers(response.data);
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textAlign: "center" }]}>CRUD APP</Text>
      <Text style={styles.title}>Users</Text>
      {users.map((user: any, index) => {
        return (
          <CrudCard
            name={user.name}
            email={user.email}
            key={index}
            id={user?._id}
            onDelete={fetchUser}
          />
        );
      })}

      <ButtonComponent
        title="Add User"
        onPress={() =>
          router.navigate({
            pathname: "/add-edit-page",
            params: {
              type: "Add",
            },
          } as any)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    gap: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "black",
  },
});
