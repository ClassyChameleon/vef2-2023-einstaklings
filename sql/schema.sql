CREATE TABLE public.endings (
  name VARCHAR(32) PRIMARY KEY,
  number INT NOT NULL DEFAULT 0
);

CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(64) NOT NULL,
  location INT DEFAULT 0,
  energy INT DEFAULT 100,
  money INT DEFAULT 0,
  created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
