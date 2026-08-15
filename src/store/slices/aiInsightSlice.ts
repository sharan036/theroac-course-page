import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/src/lib/axios";

export interface InsightsData {
  skillsMatch: boolean;
  missingSkills: string[];
  recommendedCareerPath: string;
  recommendedSkills: string[];
  recommendedLearning: string[];
  cvSuggestions: string[];
  candidateScore: number;
  scoreComparison: string;
}

export interface Insights {
  success: boolean;
  cached?: boolean;
  nextUpdateIn?: string;
  data: InsightsData;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  message: string;
  createdAt?: string;
}

interface AIState {
  insights: Insights | null;
  insightsLoading: boolean;
  insightsError: string | null;
  chatMessages: ChatMessage[];
  chatLoading: boolean;
  chatError: string | null;
}

const initialState: AIState = {
  insights: null,

  insightsLoading: false,

  insightsError: null,

  chatMessages: [],

  chatLoading: false,

  chatError: null,
};

/**
 * =========================================================
 * FETCH INSIGHTS
 * =========================================================
 */

export const fetchInsights = createAsyncThunk<
  Insights,
  void,
  { rejectValue: string }
>(
  "ai/fetchInsights",

  async (_, thunkAPI) => {
    try {
      const res =
        await axiosInstance.post<Insights>(
          "/ai/insights"
        );

      /**
       * RETURN SERIALIZABLE DATA ONLY
       */

      return res.data;
    } catch (error: any) {
      /**
       * IGNORE CANCELLED REQUESTS
       */

      if (
        error?.code === "ERR_CANCELED" ||
        error?.message === "canceled"
      ) {
        return thunkAPI.rejectWithValue(
          "Request cancelled"
        );
      }

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to load insights"
      );
    }
  }
);

/**
 * =========================================================
 * SEND AI MESSAGE
 * =========================================================
 */

export const sendAIMessage = createAsyncThunk<
  {
    userMessage: string;

    aiResponse: string;
  },
  {
    userId: string;

    message: string;
  },
  { rejectValue: string }
>(
  "ai/sendMessage",

  async (
    { userId, message },
    thunkAPI
  ) => {
    try {
      const res =
        await axiosInstance.post(
          "/ai/chat",
          {
            userId,
            message,
          }
        );

      const responseData = res.data;

      return {
        userMessage: message,

        aiResponse:
          typeof responseData === "string"
            ? responseData
            : responseData?.reply ||
              responseData?.message ||
              responseData?.response ||
              "No response received",
      };
    } catch (error: any) {
      if (
        error?.code === "ERR_CANCELED" ||
        error?.message === "canceled"
      ) {
        return thunkAPI.rejectWithValue(
          "Request cancelled"
        );
      }

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Failed to send message"
      );
    }
  }
);

/**
 * =========================================================
 * SLICE
 * =========================================================
 */

const aiSlice = createSlice({
  name: "ai",

  initialState,

  reducers: {
    clearChat: (state) => {
      state.chatMessages = [];
    },

    clearInsights: (state) => {
      state.insights = null;

      state.insightsError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /**
       * =====================================================
       * FETCH INSIGHTS
       * =====================================================
       */

      .addCase(
        fetchInsights.pending,
        (state) => {
          state.insightsLoading = true;

          state.insightsError = null;
        }
      )

      .addCase(
        fetchInsights.fulfilled,
        (state, action) => {
          state.insightsLoading = false;

          state.insights =
            action.payload;
        }
      )

      .addCase(
        fetchInsights.rejected,
        (state, action) => {
          state.insightsLoading = false;

          /**
           * IGNORE CANCELLED REQUESTS
           */

          if (
            action.payload ===
            "Request cancelled"
          ) {
            return;
          }

          state.insightsError =
            action.payload ||
            "Failed to load insights";
        }
      )

      /**
       * =====================================================
       * SEND AI MESSAGE
       * =====================================================
       */

      .addCase(
        sendAIMessage.pending,
        (state, action) => {
          state.chatLoading = true;

          state.chatError = null;

          /**
           * PUSH USER MESSAGE
           */

          state.chatMessages.push({
            id: Date.now().toString(),

            role: "user",

            message:
              action.meta.arg.message,

            createdAt:
              new Date().toISOString(),
          });
        }
      )

      .addCase(
        sendAIMessage.fulfilled,
        (state, action) => {
          state.chatLoading = false;

          /**
           * PUSH AI RESPONSE
           */

          state.chatMessages.push({
            id: `${Date.now()}-ai`,

            role: "assistant",

            message:
              action.payload.aiResponse,

            createdAt:
              new Date().toISOString(),
          });
        }
      )

      .addCase(
        sendAIMessage.rejected,
        (state, action) => {
          state.chatLoading = false;

          /**
           * IGNORE CANCELLED REQUESTS
           */

          if (
            action.payload ===
            "Request cancelled"
          ) {
            return;
          }

          state.chatError =
            action.payload ||
            "Failed to send message";
        }
      );
  },
});

export const { clearChat, clearInsights, } = aiSlice.actions;

export default aiSlice.reducer;