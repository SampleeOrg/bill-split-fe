import HomeScreen from "@/app/(tabs)";
import { getData } from "@/utils/asyncStorage";
import { render, waitFor } from "@testing-library/react-native";

jest.mock("@/utils/asyncStorage", () => ({
  getData: jest.fn(),
  removeData: jest.fn(),
}));

const mockReplace = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: jest.fn(),
  }),

  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/assets/images/event-icon.svg", () => {
  const React = jest.requireActual("react");
  const { View } = jest.requireActual("react-native");
  return function MockEventIcon(props: any) {
    return <View testID="mock-event-icon" {...props} />;
  };
});

jest.mock("react-native-safe-area-context", () => {
  const { View } = jest.requireActual("react-native");
  return {
    SafeAreaView: ({ children }: any) => <View>{children}</View>,
    useSafeAreaInsets: () => ({
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }),
  };
});

describe("<HomeScree/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Redirects to onboarding when onboarded !== 1", async () => {
    (getData as jest.Mock).mockResolvedValue(null);

    render(<HomeScreen />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/onboarding");
    });
  });
});
