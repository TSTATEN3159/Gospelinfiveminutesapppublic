import GreetingHeader from '../GreetingHeader';

export default function GreetingHeaderExample() {
  const mockUser = {
    firstName: "Sarah",
    lastName: "Johnson"
  };

  return (
    <GreetingHeader user={mockUser} />
  );
}