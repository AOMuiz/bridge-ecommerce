import {
  ChevronRight,
  Edit2,
  LogOut,
  MapPin,
  Package,
  Tag,
  User,
  Bell,
  CreditCard,
  HelpCircle,
  Info,
} from 'lucide-react-native';

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

interface ProfileData {
  name: string;
  email: string;
  avatar?: string;
}

const MenuListItem: React.FC<MenuItem> = ({icon, label}) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemContent}>
      {icon}
      <Text style={styles.menuItemText}>{label}</Text>
    </View>
    <ChevronRight size={24} color="#ccc" />
  </TouchableOpacity>
);

const AccountScreen: React.FC = () => {
  const profile: ProfileData = {
    name: 'Afsar Hossen',
    email: 'lmshuvo97@gmail.com',
    avatar: undefined, // Add your avatar image path here
  };

  const menuItems: MenuItem[] = [
    {icon: <Package size={24} />, label: 'Orders'},
    {icon: <User size={24} />, label: 'My Details'},
    {icon: <MapPin size={24} />, label: 'Delivery Address'},
    {icon: <CreditCard size={24} />, label: 'Payment Methods'},
    {icon: <Tag size={24} />, label: 'Promo Card'},
    {icon: <Bell size={24} />, label: 'Notifecations'},
    {icon: <HelpCircle size={24} />, label: 'Help'},
    {icon: <Info size={24} />, label: 'About'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          {profile.avatar ? (
            <Image source={{uri: profile.avatar}} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]} />
          )}
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
        <TouchableOpacity>
          <Edit2 size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuListItem key={index} {...item} />
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color="#4CAF50" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    backgroundColor: '#E8F5E9',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth + 1,
    borderBottomColor: '#eee',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#000',
  },
  activeTabLabel: {
    color: '#4CAF50',
  },
});

export default AccountScreen;
