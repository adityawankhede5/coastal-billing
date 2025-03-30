
# Coastal Billing – Tailwind Design System

## 1. Colors

| Purpose          | Tailwind Class         |
|-----------------|-----------------------|
| **Primary**     | `bg-blue-600 text-white` |
| **Primary Dark** | `bg-blue-700 text-white` (hover/active) |
| **Secondary**   | `bg-orange-400 text-white` |
| **Secondary Dark** | `bg-red-500 text-white` (alerts) |
| **Success**     | `text-green-600` |
| **Warning**     | `text-yellow-500` |
| **Background**  | `bg-gray-100` |
| **Text**        | `text-gray-900` |
| **Muted Text**  | `text-gray-500` |

## 2. Typography

| Element         | Tailwind Class  | Usage |
|---------------|----------------|----------------|
| **Page Title** | `text-xl font-bold` | Main headings |
| **Section Title** | `text-lg font-semibold` | Subheadings |
| **Body Text** | `text-base font-normal` | Default text |
| **Labels** | `text-sm font-medium` | Input labels, tags |
| **Hints** | `text-xs text-gray-500` | Captions, small info |

## 3. Spacing & Sizing

| Name | Tailwind Class | Usage |
|------|--------------|------|
| **Extra Small (4px)** | `p-1`, `m-1` | Tiny padding/margins |
| **Small (8px)** | `p-2`, `m-2` | Form fields, buttons |
| **Medium (16px)** | `p-4`, `m-4` | Card padding, section margins |
| **Large (24px)** | `p-6`, `m-6` | Layout spacing |
| **Extra Large (32px)** | `p-8`, `m-8` | Full section spacing |

## 4. Buttons

| Type | Tailwind Class | Example |
|------|--------------|---------|
| **Primary Button** | `bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 active:scale-95 transition` | ✅ |
| **Secondary Button** | `bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500` | ✅ |
| **Ghost Button** | `border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100` | ✅ |

## 5. Forms & Inputs

| Element | Tailwind Class | Example |
|--------|--------------|--------|
| **Input Field** | `w-full border border-gray-300 rounded-md px-3 py-2 focus:border-blue-600 focus:ring-blue-600 focus:ring-1` | ✅ |
| **TextArea** | `w-full border border-gray-300 rounded-md px-3 py-2 focus:border-blue-600 focus:ring-blue-600 focus:ring-1` | ✅ |
| **Checkbox** | `form-checkbox text-blue-600 focus:ring-blue-600` | ✅ |

## 6. Card & Lists

| Type | Tailwind Class | Example |
|------|--------------|---------|
| **Basic Card** | `bg-white shadow-md rounded-lg p-4` | ✅ |
| **List Item** | `flex justify-between p-4 border-b border-gray-200` | ✅ |
| **Divider** | `border-t border-gray-300` | ✅ |

## 7. Layout & Containers

| Purpose | Tailwind Class |
|---------|--------------|
| **Mobile Container** | `max-w-md mx-auto p-4 bg-gray-100 min-h-screen` |
| **Centered Content** | `flex items-center justify-center` |
| **Grid Layout** | `grid grid-cols-2 gap-4` |

### Why This Works?
- 📱 **Mobile-First** – Tailwind defaults to responsive  
- 🎨 **Minimal & Fresh** – Coastal colors & typography  
- 🚀 **Easy to Scale** – Simple utility classes  
