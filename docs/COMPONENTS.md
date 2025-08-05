# 🧩 Components Documentation

## Atomic Design Structure

### Atoms
- **Button**: Komponen tombol yang reusable
- **Input**: Komponen input form
- **Avatar**: Komponen foto profil user
- **Badge**: Komponen label/status

### Molecules
- **SearchBar**: Komponen pencarian
- **ArticleCard**: Komponen card artikel
- **VideoCard**: Komponen card video
- **CommentItem**: Komponen item komentar

### Organisms
- **Header**: Komponen header/navbar
- **Footer**: Komponen footer
- **ArticleList**: Komponen list artikel
- **VideoGallery**: Komponen gallery video

### Templates
- **MainLayout**: Layout utama
- **AdminLayout**: Layout admin
- **ArticleLayout**: Layout artikel
- **AuthLayout**: Layout authentication

### Pages
- **Home**: Halaman utama
- **ArticleDetail**: Detail artikel
- **VideoDetail**: Detail video
- **Admin Pages**: Halaman admin

## Usage Examples

```tsx
import { Button } from '@/components/atoms/Button';
import { ArticleCard } from '@/components/molecules/ArticleCard';

function App() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
      <ArticleCard title="Sample Article" />
    </div>
  );
}
```
