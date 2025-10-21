import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, MapPin, Gift, Shield, Zap, Globe, Users, Building2, Clock, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeedDemoData = async () => {
    setSeeding(true);
    try {
      // Create demo data directly in the client for demo purposes
      const demoData = {
        users: [
          {
            id: 1,
            email: "pakkanan.cha@truedigitalpark.com",
            password: "test1811",
            name: "Pakkanan Cha",
            role: "member",
            membership_type: "premium",
            created_at: new Date().toISOString()
          }
        ],
        spaces: [
          {
            id: 1,
            name: "True Digital Park - Bangkok",
            location: "Bangkok, Thailand",
            amenities: ["High-speed WiFi", "Meeting Rooms", "Coffee Bar", "24/7 Access"],
            capacity: 200,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
          },
          {
            id: 2,
            name: "WeWork - Tokyo",
            location: "Tokyo, Japan",
            amenities: ["Flexible Desks", "Phone Booths", "Kitchen", "Events Space"],
            capacity: 150,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
          },
          {
            id: 3,
            name: "Taipei Coworking Hub",
            location: "Taipei, Taiwan",
            amenities: ["Private Offices", "Conference Rooms", "Lounge Area", "Parking"],
            capacity: 100,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
          }
        ],
        bookings: [
          {
            id: 1,
            user_id: 1,
            space_id: 1,
            date: new Date().toISOString(),
            status: "confirmed",
            duration: "full_day"
          }
        ]
      };

      // Store demo data in localStorage for demo purposes
      localStorage.setItem('tdpk_demo_data', JSON.stringify(demoData));
      localStorage.setItem('tdpk_demo_seeded', 'true');
      
      toast({
        title: "Demo Data Created",
        description: "Demo users and data have been seeded successfully. You can now log in with the demo credentials.",
      });
    } catch (error: any) {
      toast({
        title: "Seeding Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Demo Credentials Banner */}
      <div className="bg-primary/10 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Demo Credentials:</span>
            <span className="font-mono bg-muted px-2 py-1 rounded">pakkanan.cha@truedigitalpark.com</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-mono bg-muted px-2 py-1 rounded">test1811</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="h-12 w-12 text-secondary animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            TDPK
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Your Global Coworking Network Pass
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Access premium coworking spaces across Asia with one membership. 
          Work anywhere, connect everywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" variant="hero" className="min-w-[200px]">
            <Link to="/auth">Get Started</Link>
          </Button>
          <Button 
            onClick={handleSeedDemoData} 
            disabled={seeding}
            size="lg" 
            variant="outline" 
            className="min-w-[200px]"
          >
            {seeding ? "Seeding..." : "Setup Demo Data"}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Global Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Access partner spaces across Thailand, Japan, Taiwan, and beyond
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Smart Directory</h3>
                  <p className="text-sm text-muted-foreground">
                    Find and navigate to nearby coworking spaces with ease
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Gift className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Exclusive Perks</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock special offers and discounts at partner locations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Instant Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick QR code scanning for seamless check-ins
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tenant Privilege</h3>
                  <p className="text-sm text-muted-foreground">
                    Special benefits for office tenants in the network
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Digital Pass</h3>
                  <p className="text-sm text-muted-foreground">
                    Your membership in your pocket, always accessible
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Spaces Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Coworking Spaces</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience our premium partner locations across Asia
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Building2 className="h-16 w-16 text-primary/60" />
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">True Digital Park - Bangkok</h3>
              <p className="text-sm text-muted-foreground mb-3">Bangkok, Thailand</p>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-muted-foreground">(200+ reviews)</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>200 capacity</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Access</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
              <Building2 className="h-16 w-16 text-secondary/60" />
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">WeWork - Tokyo</h3>
              <p className="text-sm text-muted-foreground mb-3">Tokyo, Japan</p>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.6</span>
                <span className="text-sm text-muted-foreground">(150+ reviews)</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>150 capacity</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Flexible Hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Building2 className="h-16 w-16 text-primary/60" />
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Taipei Coworking Hub</h3>
              <p className="text-sm text-muted-foreground mb-3">Taipei, Taiwan</p>
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.7</span>
                <span className="text-sm text-muted-foreground">(100+ reviews)</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>100 capacity</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Business Hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to work anywhere?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust TDPK for flexible workspace access
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="premium">
                <Link to="/auth">Start Your Journey</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/auth">Learn More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;