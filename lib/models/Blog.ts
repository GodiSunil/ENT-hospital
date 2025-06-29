import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    name: String,
    image: String,
    bio: String,
  },
  category: {
    type: String,
    required: true,
    enum: ['ear-health', 'nose-health', 'throat-health', 'pediatric-care', 'hearing-loss', 'voice-disorders', 'allergies', 'general-health'],
  },
  tags: {
    type: [String],
    default: [],
  },
  featuredImage: {
    type: String,
    required: true,
  },
  readTime: {
    type: String,
    default: '5 min read',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);