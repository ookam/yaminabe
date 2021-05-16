yarn build
yarn run http-server &
pages=("/" "/contributors" "/logs/001")
rm -rf ss
mkdir ss
for page in ${pages[@]}
do
  echo "http://127.0.0.1:8080/yaminabe$page"
  chrome --headless --disable-gpu --screenshot="ss/${page////_}.png" "http://127.0.0.1:8080/yaminabe$page"
done
