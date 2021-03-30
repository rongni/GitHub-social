/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
import React from 'react';
import {
  ScrollView, View, Image, Text, SafeAreaView, StyleSheet,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileComponent = ({
  data: { loading, error, user },
  navigation: { navigate },
}) => {
  if (loading) return <Text>Fetching users... </Text>;
  if (error) {
    return (
      <Text>
        {error.message}
      </Text>
    );
  }

  const {
    login, name, bio, email, websiteUrl, createdAt, avatarUrl, repositories, followers, following,
  } = user; // extracted after response loads

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#7F7FD5', '#86A8E7', '#91EAE4']}
        style={styles.background}
      />
      <View style={styles.headerContainer}>

        <View style={styles.headerColumn}>
          <Image
            source={{
              uri: avatarUrl,
            }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 20, marginRight: 15, marginButtom: 10 }}>
            <Title style={[styles.title]}>
              {name}
            </Title>
          </View>
          <View style={{ marginLeft: 20, marginRight: 15, marginButtom: 10 }}>
            <Text style={[styles.text]}>
              {login}
            </Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{bio}</Text>
          </View>
        </View>
      </View>
      <View style={{
        flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 50,
      }}
      >
        <TouchableRipple onPress={() => navigate('Follower', { username: login })}>
          <View style={styles.menuItem}>
            <Icon name="persons" color="#FF6347" size={30} style={{ alignSelf: 'center' }} />
            <Text style={styles.menuItemText}>
              Followers:
              {followers.totalCount}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigate('Repo', { username: login })}>
          <View style={styles.menuItem}>
            <Icon name="github" color="purple" size={30} style={{ alignSelf: 'center' }} />
            <Text style={styles.menuItemText}>
              Total Repos:
              {repositories.totalCount}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigate('Following', { username: login })}>
          <View style={styles.menuItem}>
            <Icon name="eye" color="#FF6347" size={30} style={{ alignSelf: 'center' }} />
            <Text style={styles.menuItemText}>
              Followings:
              {following.totalCount}
            </Text>
          </View>
        </TouchableRipple>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="email" color="red" size={40} />
          <Text style={styles.rowItemText}>{email}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="earth" color="blue" size={40} />
          <Text style={styles.rowItemText}>{websiteUrl}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    // marginTop: 20,
    marginBottom: 250,
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 22,
    paddingBottom: 8,
    textAlign: 'center',
  },
  headerContainer: {
    // backgroundColor: '#191b43',
  },
  text: {
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 25,
  },
  rowItemText: {
    color: 'black',
    marginLeft: 25,
    marginRight: 15,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 40,
  },
  menuWrapper: {
    marginTop: 25,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  menuItem: {
    flexDirection: 'column',
  },
  menuItemText: {
    color: '#777777',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 30,
  },
  gradient: {
    flex: 1,
  },
  headerColumn: {
    alignItems: 'center',
    elevation: 1,
    marginTop: -1,
    marginBottom: 45,
  },
  avatar: {
    borderColor: '#ff0000 #00ff00 #0000ff rgb(250,0,255)',
    borderRadius: 85,
    borderWidth: 2,
    height: 130,
    marginTop: 15,
    marginBottom: 15,
    width: 130,
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
  },
  userBioText: {
    color: 'gray',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default withNavigation(ProfileComponent);
