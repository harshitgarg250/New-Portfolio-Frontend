import api from './api'

const portfolioService = {
  // Profile
  getProfile: async () => {
    try {
      const response = await api.get('/profile')
      return response.data
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  },

  // Projects
  getProjects: async () => {
    try {
      const response = await api.get('/projects')
      return response.data
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  },

  getProject: async (slug) => {
    try {
      const response = await api.get(`/projects/${slug}`)
      return response.data
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  },

  getFeaturedProjects: async () => {
    try {
      const response = await api.get('/projects', { params: { featured: true } })
      return response.data
    } catch (error) {
      console.error('Error fetching featured projects:', error)
      return []
    }
  },

  // Skills
  getSkills: async () => {
    try {
      const response = await api.get('/skills')
      return response.data
    } catch (error) {
      console.error('Error fetching skills:', error)
      return []
    }
  },

  // Experience
  getExperience: async () => {
    try {
      const response = await api.get('/experience')
      return response.data
    } catch (error) {
      console.error('Error fetching experience:', error)
      return []
    }
  },

  // Posts
  getPosts: async () => {
    try {
      const response = await api.get('/posts')
      return response.data
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  },

  getPost: async (slug) => {
    try {
      const response = await api.get(`/posts/${slug}`)
      return response.data
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  },

  // Contact
  submitContact: async (data) => {
    const response = await api.post('/contact', data)
    return response.data
  },
}

export default portfolioService

// Also export individual functions for backward compatibility
export const getProjects = portfolioService.getProjects
export const getProject = portfolioService.getProject
export const getFeaturedProjects = portfolioService.getFeaturedProjects
export const getBlogPosts = portfolioService.getPosts
export const getBlogPost = portfolioService.getPost
export const getSkills = portfolioService.getSkills
export const getExperience = portfolioService.getExperience
export const getProfile = portfolioService.getProfile
export const sendContactMessage = portfolioService.submitContact
