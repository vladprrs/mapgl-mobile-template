/**
 * Centralized organizations mock data
 * All organization mocks consolidated here
 */

export * from './grocery';
export * from './electronics';
export * from './restaurants';
export * from './medical';
export * from './automotive';
export * from './beauty';
export * from './featured';

// Import all organizations for unified export
import { groceryStores } from './grocery';
import { electronicsStores } from './electronics';
import { restaurants } from './restaurants';
import { medicalServices } from './medical';
import { automotiveServices } from './automotive';
import { beautyServices } from './beauty';
import { featuredOrganizations } from './featured';

/**
 * All organizations combined
 * Use this for complete organization dataset
 */
export const allOrganizations = [
  ...groceryStores,
  ...electronicsStores,
  ...restaurants,
  ...medicalServices,
  ...automotiveServices,
  ...beautyServices,
  ...featuredOrganizations,
];

/**
 * Organizations by category
 * Use this for category-specific filtering
 */
export const organizationsByCategory = {
  grocery: groceryStores,
  electronics: electronicsStores,
  restaurants: restaurants,
  medical: medicalServices,
  automotive: automotiveServices,
  beauty: beautyServices,
  featured: featuredOrganizations,
};

/**
 * Advertiser organizations only
 * Use this for promotional content
 */
export const advertiserOrganizations = allOrganizations.filter(org => org.type === 'advertiser');

/**
 * Regular organizations only
 * Use this for standard search results
 */
export const regularOrganizations = allOrganizations.filter(org => org.type === 'regular');