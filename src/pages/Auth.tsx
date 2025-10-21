import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if demo data is seeded
      const isSeeded = localStorage.getItem('tdpk_demo_seeded');
      if (!isSeeded) {
        toast({
          title: "Demo Data Required",
          description: "Please seed demo data first from the homepage.",
          variant: "destructive",
        });
        return;
      }

      // Load demo data
      const demoData = JSON.parse(localStorage.getItem('tdpk_demo_data') || '{}');
      const user = demoData.users?.find((u: any) => u.email === email);

      if (!user || user.password !== password) {
        toast({
          title: "Invalid Credentials",
          description: "Please check your email and password.",
          variant: "destructive",
        });
        return;
      }

      // Store user session
      localStorage.setItem('tdpk_user_session', JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        loggedIn: true,
        loginTime: new Date().toISOString()
      }));

      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('pakkanan.cha@truedigitalpark.com');
    setPassword('test1811');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            TDPK
          </h1>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your global coworking network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials Helper */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Demo Credentials</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Use these credentials to access the demo:
              </p>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-mono bg-background px-2 py-1 rounded">pakkanan.cha@truedigitalpark.com</span>
                </div>
                <div>
                  <span className="font-mono bg-background px-2 py-1 rounded">test1811</span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDemoCredentials}
                className="w-full mt-3"
              >
                Fill Demo Credentials
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/" className="text-primary hover:underline">
                Setup Demo Data
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;