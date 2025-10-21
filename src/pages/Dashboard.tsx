import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Building2, 
  Star,
  LogOut,
  QrCode,
  Gift,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface Space {
  id: number;
  name: string;
  location: string;
  amenities: string[];
  capacity: number;
  rating: number;
  image: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem('tdpk_user_session');
    if (!session) {
      navigate('/auth');
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      setUser(sessionData.user);

      // Load demo spaces
      const demoData = JSON.parse(localStorage.getItem('tdpk_demo_data') || '{}');
      setSpaces(demoData.spaces || []);
    } catch (error) {
      console.error('Error loading session:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('tdpk_user_session');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-8 w-8 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
                TDPK
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
          <p className="text-muted-foreground">
            Your global coworking network is ready. Find and book spaces across Asia.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <QrCode className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Digital Pass</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your membership QR code for instant check-ins
              </p>
              <Button className="w-full" variant="outline">
                View QR Code
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">Book Space</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Reserve your workspace at any partner location
              </p>
              <Button className="w-full" variant="outline">
                Browse Spaces
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Rewards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View your exclusive perks and discounts
              </p>
              <Button className="w-full" variant="outline">
                View Rewards
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Spaces */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Available Spaces</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <Card key={space.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-primary/60" />
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">{space.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{space.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{space.rating}</span>
                    <span className="text-sm text-muted-foreground">({space.capacity}+ reviews)</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{space.capacity} capacity</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>24/7 Access</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" variant="default">
                      Book Now
                    </Button>
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest coworking space visits and bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Checked in at True Digital Park - Bangkok</p>
                  <p className="text-sm text-muted-foreground">Today at 9:30 AM</p>
                </div>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">WeWork - Tokyo booking confirmed</p>
                  <p className="text-sm text-muted-foreground">Yesterday at 2:15 PM</p>
                </div>
                <span className="text-sm text-blue-600 font-medium">Confirmed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;