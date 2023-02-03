

declare namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_ACCESS_KEY_ID: String
            REACT_APP_SECRET_ACCESS_KEY: String
            REACT_APP_REGION_ID: String
            REACT_APP_BUCKET_NAME: String
            REACT_APP_BUCKET_URL: String
        }
    }

export {}