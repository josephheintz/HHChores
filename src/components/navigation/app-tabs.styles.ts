// All visual styles for app-tabs.web.tsx as Tailwind class strings.
// Spacing scale → Tailwind: 4px=p-1, 8px=p-2, 16px=p-4, 32px=p-8
// Theme colours: backgroundElement #F0F0F3 / dark #212225
//                backgroundSelected #E0E1E6 / dark #2E3135

export const tabStyles = {
  dropdownContainer: 'absolute top-0 left-0 right-0 z-10 items-center pt-4',
  tabListContainer: 'w-full px-4 flex-row justify-center items-center',
  innerContainer:
    'w-full max-w-[800px] py-2 px-8 rounded-t-[32px] rounded-b-[20px] flex-row items-center gap-2 ' +
    'bg-[#F0F0F3] dark:bg-[#212225]',
  tabsRight: 'flex-row items-center ml-auto gap-2',
  tabsGroup: 'flex-row items-center gap-2',
  handleWrap: 'items-center -mt-1',
  handleButton:
    'min-w-[40px] h-7 px-2 rounded-b-[14px] flex-row items-center justify-center ' +
    'bg-[#F0F0F3] dark:bg-[#212225]',
  tabButtonFocused: 'py-1 px-4 rounded-2xl bg-[#E0E1E6] dark:bg-[#2E3135]',
  tabButtonIdle: 'py-1 px-4 rounded-2xl bg-[#F0F0F3] dark:bg-[#212225]',
} as const;
