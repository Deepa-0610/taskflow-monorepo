# @taskflow/api

API utilities and backend logic for Taskflow.

## Exports

### Services
- `supabaseClient` - Configured Supabase client

### Features
- Supabase integration
- API utilities
- Database services

## Usage

```typescript
import { supabaseClient } from '@taskflow/api'

const { data, error } = await supabaseClient
  .from('tasks')
  .select('*')
```