import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import OnboardingPage from "../app/onboarding";
import { storeData } from "@/utils/asyncStorage";

const mockReplace = jest.fn();

jest.mock(
  "@/utils/asyncStorage",
  () => ({
    storeData: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  "@/utils/color",
  () => ({
    COLOR: {
      dark1: "#111111",
      primary2: "#222222",
      primary3: "#333333",
      secondary3: "#444444",
    },
  }),
  { virtual: true }
);

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock("react-native-onboarding-swiper", () => {
  const React = jest.requireActual("react");
  const { View, Text } = jest.requireActual("react-native");

  const MockOnboarding = ({
    SkipButtonComponent,
    NextButtonComponent,
    DoneButtonComponent,
    onSkip,
    onDone,
    pages = [],
  }: any) => {
    const [index, setIndex] = React.useState(0);
    const page = pages[index] ?? {};

    const handleNext = () => {
      if (index < pages.length - 1) {
        setIndex(index + 1);
        return;
      }
      onDone?.();
    };

    return (
      <View>
        <View testID="mock-onboarding-page">
          {page.title ? <Text>{page.title}</Text> : null}
          {page.subtitle ? <Text>{page.subtitle}</Text> : null}
        </View>
        {SkipButtonComponent ? <SkipButtonComponent onPress={onSkip} /> : null}
        {NextButtonComponent ? <NextButtonComponent onPress={handleNext} /> : null}
        {DoneButtonComponent ? <DoneButtonComponent onPress={onDone} /> : null}
      </View>
    );
  };

  MockOnboarding.displayName = "MockOnboarding";

  return MockOnboarding;
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

const storeDataMock = storeData as jest.MockedFunction<typeof storeData>;

describe("OnboardingPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storeDataMock.mockResolvedValue(undefined);
  });

  it("stores onboarding flag and redirects when skipping", async () => {
    const { getByText } = render(<OnboardingPage />);

    fireEvent.press(getByText("Skip"));

    await waitFor(() => {
      expect(storeDataMock).toHaveBeenCalledWith("onboarded", "1");
    });
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("stores onboarding flag and redirects when completing onboarding", async () => {
    const { getByText } = render(<OnboardingPage />);

    fireEvent.press(getByText("Done"));

    await waitFor(() => {
      expect(storeDataMock).toHaveBeenCalledWith("onboarded", "1");
    });
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("advances content when pressing Next without finishing onboarding", () => {
    const { getByText } = render(<OnboardingPage />);

    expect(getByText("Divvy")).toBeTruthy();
    fireEvent.press(getByText("Next"));
    expect(getByText("Nhanh, Chuẩn, Không ai thiệt!")).toBeTruthy();

    expect(storeDataMock).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
