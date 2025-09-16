import BottomNavigation from '../BottomNavigation';

export default function BottomNavigationExample() {
  return (
    <BottomNavigation 
      currentPage="home" 
      onPageChange={(page) => console.log('Page changed to:', page)} 
    />
  );
}