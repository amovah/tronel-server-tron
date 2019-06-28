for file in ./env/*
do
  cp "$file" "./env/.${file##*/}"
done
