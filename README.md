# TDPK Global Coworking Network - Demo

A modern React application for managing global coworking space access with demo data seeding functionality.

## Features

- 🏢 **Global Access**: Browse coworking spaces across Asia
- 🔐 **Demo Authentication**: Pre-configured demo credentials
- 📱 **Responsive Design**: Modern UI with Tailwind CSS
- 🎯 **Demo Data Seeding**: One-click setup for demonstration
- 🚀 **Fast Development**: Built with Vite and TypeScript

## Demo Credentials

- **Email**: `pakkanan.cha@truedigitalpark.com`
- **Password**: `test1811`

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5173`

4. **Setup Demo Data**
   - Click "Setup Demo Data" button on the homepage
   - Use the demo credentials to log in
   - Explore the dashboard and features

## Project Structure

```
src/
├── components/ui/          # Reusable UI components
├── hooks/                  # Custom React hooks
├── integrations/           # External service integrations
├── pages/                  # Page components
│   ├── Index.tsx          # Landing page
│   ├── Auth.tsx           # Authentication page
│   └── Dashboard.tsx      # User dashboard
└── lib/                   # Utility functions
```

## Key Components

### Landing Page (`/`)
- Hero section with call-to-action
- Feature showcase grid
- Demo data seeding functionality
- Featured spaces preview

### Authentication (`/auth`)
- Login form with demo credentials
- Auto-fill demo credentials button
- Form validation and error handling

### Dashboard (`/dashboard`)
- User welcome and quick actions
- Available spaces grid
- Recent activity feed
- Digital pass and booking features

## Demo Data

The application includes pre-configured demo data:

- **Users**: Demo user with premium membership
- **Spaces**: 3 coworking spaces across Asia
- **Bookings**: Sample booking history
- **Amenities**: Space features and ratings

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **Local Storage** for demo data persistence

## Customization

### Adding New Spaces
Edit the demo data in `src/pages/Index.tsx`:

```typescript
const demoData = {
  spaces: [
    {
      id: 4,
      name: "Your Space Name",
      location: "City, Country",
      amenities: ["WiFi", "Meeting Rooms"],
      capacity: 100,
      rating: 4.5,
      image: "image_url"
    }
  ]
};
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Update CSS variables in `src/index.css`
- Customize component styles in individual files

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Demo Features

1. **One-Click Setup**: Seed demo data instantly
2. **Realistic UI**: Professional design with smooth animations
3. **Responsive**: Works on desktop, tablet, and mobile
4. **Interactive**: Full navigation and form interactions
5. **Persistent**: Demo data persists across sessions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a demo application for TDPK Global Coworking Network.