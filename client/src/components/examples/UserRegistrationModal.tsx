import UserRegistrationModal from '../UserRegistrationModal';

export default function UserRegistrationModalExample() {
  return (
    <UserRegistrationModal 
      isOpen={true} 
      onClose={(userData) => console.log('Modal closed with:', userData)} 
    />
  );
}