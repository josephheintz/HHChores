// All visual styles for app-tabs.web.tsx as Tailwind class strings.
// Spacing scale → Tailwind: 4px=p-1, 8px=p-2, 16px=p-4, 32px=p-8
// Theme colours: backgroundElement #F0F0F3 / dark #212225
//                backgroundSelected #E0E1E6 / dark #2E3135

export const tabStyles = {
  // Outer bar: pinned to top, full-width, centres the inner pill
  tabListContainer: 'absolute w-full p-4 flex-row justify-center items-center',

  // Inner pill container
  innerContainer:
    'py-2 px-8 rounded-[32px] flex-row items-center grow gap-2 max-w-[800px] ' +
    'bg-[#F0F0F3] dark:bg-[#212225]',

  // Right-side tab group
  tabsRight: 'flex-row items-center ml-auto gap-2',

  // Individual tab button — focused vs idle
  tabButtonFocused: 'py-1 px-4 rounded-2xl bg-[#E0E1E6] dark:bg-[#2E3135]',
  tabButtonIdle: 'py-1 px-4 rounded-2xl bg-[#F0F0F3] dark:bg-[#212225]',
} as const;
