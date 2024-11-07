export const VALIDATION_CONSTANTS = {
  ACCOUNT: {
    NAME: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 20,
      REQUIRED_ERROR: 'Account name is required'
    }
  },
  TRANSFER: {
    MIN_AMOUNT: 0.01
  }
};

export const ACCOUNT_TYPES = ['Chequing', 'Saving'] as const;

export const UI_CONSTANTS = {
  SNACKBAR: {
    DURATION: 3000
  }
}; 