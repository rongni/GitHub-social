import React from 'react'
import { ScrollView, View, Text, FlatList, SafeAreaView } from 'react-native'
import { Alert, StyleSheet } from 'react-native';
import {
  Avatar,
  Paragraph,
  Card,
  Button,
  IconButton,
  useTheme,
} from 'react-native-paper';

interface PrivateRouteProps {
    data: any;
    // any other props that come into the component
  }
const RepoComponent:React.FunctionComponent<PrivateRouteProps> = ({data: { loading, error, user}}) => {
    if (loading) return <Text>fetching posts... </Text>;
    if (error) return <Text>Error! ${error.message}</Text>;

    const responseData = user.repositories.nodes
    
    console.log(responseData)

    return(
        
            <FlatList
                data={responseData}
                keyExtractor={(item) => item.name.toString()}
                renderItem={({ item }) => {
                    return(
                        <Card style={styles.card}>
                            <Card.Title title={item.name} />
                            <Card.Content>
                                <Text>Repository Name: {item.name}</Text>
                                <Text>Owner Name: {item.owner.login}</Text>
                                <Text>Description: {item.description}</Text>
                            </Card.Content>
                        </Card>
                        );
                }}
            />
       
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: 10,
    },
    card: {
      margin: 30,
      borderRadius:15
    },
  });


export default RepoComponent
