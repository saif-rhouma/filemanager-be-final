function TinyID(length: number = 8): string {
  let fixedLength = 10;
  if (length > 0 && length <= 10) fixedLength = length;
  return Math.random()
    .toString(36)
    .slice(2, 2 + fixedLength);
}

export default TinyID;
