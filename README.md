# Product Management System

### Installation
```bash
# Clone and setup
git clone https://github.com/omarjaab/ProductManagement.git
cd product-management

# Backend (.NET 9.0)
cd backend
dotnet restore
dotnet ef database update
dotnet run  # Runs on http://localhost:5279
            # Swagger UI: http://localhost:5279/swagger/index.html

# Frontend (new terminal)
cd ../frontend
npm install
npm start  # Runs on http://localhost:3000
