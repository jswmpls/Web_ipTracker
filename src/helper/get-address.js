export async function getAddress(ip = "8.8.8.8") {
  const response = await fetch(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=80b926ad363b4150ad2294d760607e9a&ip_address=${ip}`
  );

  return await response.json();
}
