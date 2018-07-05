# dj-press
dj-press final live-code

## Description
dj-press adalah aplikasi web untuk menulis artikel. Nanti ada halaman utama yang memunculkan kumpulan artikel secara ringkas dan daftarnya. Ketika diklik salah satu artikel akan memunculkkan detailnya

Untuk menulisnya ada fitur login dan register. Orang yang belum login hanya bisa melihat tapi tak bisa mengedit atau menghapus artikel yang dibuat. Saat sudah login, user bisa menulis, mengedit dan menghapus artikel yang dia punya

Untuk mencari artikel dapat menggunakan fitur pencarian (search) melalui pencarian dengan kata kunci nama penulis, judul, artikel dan kategory artikel

Untuk membuat artikel baru dan mengedit artikel yang sudah dipublikasikan dapat menggunakan editor penulisan. 


## API Endpoint

List of basic routes user:

|Route | HTTP | Description|
|------|------|------------|
|'/users/signin'| POST | user sign in into the application |
|'/users/signup'| POST | user sign up for get account |

List of basic routes article:

|Route | HTTP | Description|
|------|------|------------|
|'/articles'| GET | getting all articles from database |
|'/articles/:id'| GET | getting one article with specific id|
|'/articles'| POST | input a new articles into database |
|'/articles/:id'| PUT | add comment to articles |
|'/articles/edit/:id'| PUT | edit a significant articles |
|'/articles/:id'| DELETE | delete a significant articles |
|'/articles/:category'| GET | getting all articles with significant category|
|'/articles/:author'| GET | getting all articles with significant author|
|'/articles/:title'| GET | getting all articles with significant title|



