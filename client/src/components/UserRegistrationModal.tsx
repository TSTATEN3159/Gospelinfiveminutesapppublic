import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: (userData?: UserData) => void;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  birthMonth: string;
  birthDay: string;
  phone: string;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

export default function UserRegistrationModal({ isOpen, onClose }: UserRegistrationModalProps) {
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    birthMonth: "",
    birthDay: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User registration submitted:", formData);
    onClose(formData);
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md" data-testid="modal-registration">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-primary">
            Welcome to The Gospel in 5 Minutes
          </DialogTitle>
          <p className="text-center text-muted-foreground mt-2">
            Please share a few details to personalize your spiritual journey
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                data-testid="input-firstName"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                data-testid="input-lastName"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              data-testid="input-email"
            />
          </div>

          <div>
            <Label>Birthday</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select value={formData.birthMonth} onValueChange={(value) => handleInputChange("birthMonth", value)}>
                <SelectTrigger data-testid="select-birthMonth">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={formData.birthDay} onValueChange={(value) => handleInputChange("birthDay", value)}>
                <SelectTrigger data-testid="select-birthDay">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              data-testid="input-phone"
            />
          </div>

          <Button type="submit" className="w-full" data-testid="button-submit">
            Begin My Spiritual Journey
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}