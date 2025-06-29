"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, Search, Filter, BookOpen, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    image: string;
    bio: string;
  };
  category: string;
  tags: string[];
  featuredImage: string;
  readTime: string;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  likes: number;
  createdAt: string;
}

// Sample blog posts data
const samplePosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Understanding Hearing Loss: Early Signs and Treatment Options',
    slug: 'understanding-hearing-loss-early-signs-treatment',
    excerpt: 'Learn about the different types of hearing loss, early warning signs to watch for, and modern treatment options including hearing aids and cochlear implants.',
    content: '',
    author: {
      name: 'Dr. Michael Chen',
      image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Otology and Audiology Specialist'
    },
    category: 'hearing-loss',
    tags: ['hearing loss', 'audiology', 'treatment'],
    featuredImage: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    readTime: '8 min read',
    isPublished: true,
    isFeatured: true,
    views: 1250,
    likes: 89,
    createdAt: '2024-01-15'
  },
  {
    _id: '2',
    title: 'Chronic Sinusitis: When to Consider Surgery',
    slug: 'chronic-sinusitis-when-consider-surgery',
    excerpt: 'Explore the symptoms of chronic sinusitis, conservative treatment approaches, and when endoscopic sinus surgery might be the best option.',
    content: '',
    author: {
      name: 'Dr. Emily Rodriguez',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Rhinology and Sinus Surgery Specialist'
    },
    category: 'nose-health',
    tags: ['sinusitis', 'surgery', 'nose health'],
    featuredImage: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    readTime: '6 min read',
    isPublished: true,
    isFeatured: true,
    views: 980,
    likes: 67,
    createdAt: '2024-01-12'
  },
  {
    _id: '3',
    title: 'Voice Care for Professional Speakers and Singers',
    slug: 'voice-care-professional-speakers-singers',
    excerpt: 'Essential voice care tips for professionals who rely on their voice, including warm-up exercises, hydration, and when to seek professional help.',
    content: '',
    author: {
      name: 'Dr. James Wilson',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Voice and Laryngology Specialist'
    },
    category: 'voice-disorders',
    tags: ['voice care', 'professional voice', 'singers'],
    featuredImage: 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    readTime: '5 min read',
    isPublished: true,
    isFeatured: false,
    views: 756,
    likes: 45,
    createdAt: '2024-01-10'
  },
  {
    _id: '4',
    title: 'Pediatric ENT: Common Conditions in Children',
    slug: 'pediatric-ent-common-conditions-children',
    excerpt: 'A comprehensive guide to common ENT conditions in children, including ear infections, tonsillitis, and when ear tubes might be necessary.',
    content: '',
    author: {
      name: 'Dr. Sarah Johnson',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Pediatric ENT Specialist'
    },
    category: 'pediatric-care',
    tags: ['pediatric', 'children', 'ear infections'],
    featuredImage: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    readTime: '7 min read',
    isPublished: true,
    isFeatured: false,
    views: 1100,
    likes: 78,
    createdAt: '2024-01-08'
  },
  {
    _id: '5',
    title: 'Managing Seasonal Allergies: ENT Perspective',
    slug: 'managing-seasonal-allergies-ent-perspective',
    excerpt: 'Learn how seasonal allergies affect your ears, nose, and throat, and discover effective treatment strategies from an ENT perspective.',
    content: '',
    author: {
      name: 'Dr. Emily Rodriguez',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Rhinology and Allergy Specialist'
    },
    category: 'allergies',
    tags: ['allergies', 'seasonal', 'treatment'],
    featuredImage: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    readTime: '6 min read',
    isPublished: true,
    isFeatured: false,
    views: 890,
    likes: 56,
    createdAt: '2024-01-05'
  },
  {
    _id: '6',
    title: 'Sleep Apnea and ENT: Understanding the Connection',
    slug: 'sleep-apnea-ent-understanding-connection',
    excerpt: 'Discover how ENT conditions can contribute to sleep apnea and explore treatment options that can improve your sleep quality.',
    content: '',
    author: {
      name: 'Dr. James Wilson',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Head & Neck Surgery Specialist'
    },
    category: 'throat-health',
    tags: ['sleep apnea', 'throat', 'sleep disorders'],
    featuredImage: 'https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    readTime: '9 min read',
    isPublished: true,
    isFeatured: false,
    views: 1340,
    likes: 92,
    createdAt: '2024-01-03'
  }
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'ear-health', label: 'Ear Health' },
  { value: 'nose-health', label: 'Nose Health' },
  { value: 'throat-health', label: 'Throat Health' },
  { value: 'pediatric-care', label: 'Pediatric Care' },
  { value: 'hearing-loss', label: 'Hearing Loss' },
  { value: 'voice-disorders', label: 'Voice Disorders' },
  { value: 'allergies', label: 'Allergies' },
  { value: 'general-health', label: 'General Health' }
];

export default function Blog() {
  useEffect(() => {
    // Remove any default padding/margin from the main content
    document.querySelector('main')?.classList.add('pt-0');
  }, []);
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(samplePosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterPosts();
  }, [searchTerm, selectedCategory, posts]);

  const filterPosts = () => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  };

  const featuredPosts = posts.filter(post => post.isFeatured);

  return (
    <div className="min-h-screen bg-background pt-0">
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <BookOpen className="w-4 h-4 mr-2 text-primary" />
              <span className="text-primary font-medium">Health Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-manrope text-foreground mb-6">
              ENT Health
              <span className="text-gradient block">Tips & Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest insights, tips, and medical advances in 
              ear, nose, and throat health from our expert specialists.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-8">
              <TrendingUp className="w-6 h-6 text-accent mr-3" />
              <h2 className="text-2xl font-bold font-manrope text-foreground">Featured Articles</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl medical-shadow overflow-hidden hover-lift group"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-white">Featured</Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold font-manrope text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={post.author.image}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                          <p className="text-xs text-muted-foreground">{post.author.bio}</p>
                        </div>
                      </div>
                      
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-manrope text-foreground mb-8">All Articles</h2>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl medical-shadow">
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl medical-shadow overflow-hidden hover-lift group"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">{categories.find(c => c.value === post.category)?.label}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold font-manrope text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={post.author.image}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium text-foreground">{post.author.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                            Read →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && !loading && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all articles.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-manrope">
              Stay Updated with Health Tips
            </h2>
            <p className="text-xl opacity-90">
              Subscribe to our newsletter for the latest ENT health insights and tips 
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 font-semibold">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}