# Food Product Explorer

A modern web application that allows users to explore and search food products using the OpenFoodFacts API. Built with Next.js and TypeScript, this application provides a seamless interface for discovering detailed nutritional information about food products.

## Features

The application offers a comprehensive set of features for exploring food products:

### Search and Discovery
- Real-time product search by name
- Barcode search functionality for quick product lookup
- Category-based filtering
- Advanced sorting options (by name and nutrition grade)
- Infinite scroll pagination for smooth browsing

### Product Information
- Detailed product views showing comprehensive nutritional information
- High-quality product images
- Nutrition grades with visual indicators
- Complete ingredient lists
- Detailed nutritional values per 100g
- Product categories and labels

### User Interface
- Responsive design that works on both mobile and desktop
- Intuitive navigation between product grid and detail views
- Loading states with skeleton placeholders
- Error handling with user-friendly messages

## Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for efficient state handling
- **Data Fetching**: Axios for API communication
- **API**: OpenFoodFacts API integration

## Getting Started

Follow these steps to get the project running on your local machine:

1. Clone the repository:
```bash
git clone https://github.com/Neverm1ndEZ/food-product.git
cd food-product-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://world.openfoodfacts.org
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
food-product-explorer/
├── src/
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── lib/               # Utility functions and API setup
│   ├── store/             # Zustand store configurations
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── package.json          # Project dependencies and scripts
```

## Key Components

### ProductGrid
Displays a responsive grid of product cards with infinite scroll functionality. Handles sorting, filtering, and search results display.

### ProductDetail
Shows comprehensive product information including nutritional values, ingredients, and product images. Accessible through product card clicks or direct barcode search.

### Navbar
Contains the search functionality and navigation elements. Enables seamless transitions between views based on user interactions.

### Filters
Provides category filtering and sorting options for product discovery.

## API Integration

The application integrates with the OpenFoodFacts API to fetch product data. Key endpoints used include:

- Product Search: `/cgi/search.pl`
- Product Details: `/api/v0/product/{barcode}.json`
- Categories: `/categories.json`

## Performance Optimizations

- Implemented skeleton loading states for better user experience
- Image optimization using Next.js Image component
- Efficient state management with Zustand
- Client-side caching of API responses
- Debounced search functionality
- Infinite scroll for pagination

## Error Handling

The application includes comprehensive error handling:
- Fallback UI for failed API requests
- Placeholder images for missing product images
- Graceful handling of missing or incomplete data
- User-friendly error messages

## Future Improvements

Potential enhancements for future versions:
- User authentication and favorites list
- Comparison feature for multiple products
- Offline support with PWA capabilities
- Enhanced filtering options
- Product recommendations
- Nutritional information charts and visualizations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenFoodFacts for providing the comprehensive food product database
- The Next.js team for the excellent framework
- The Tailwind CSS team for the utility-first CSS framework

## Contact

For any queries regarding this project, please open an issue in the GitHub repository.