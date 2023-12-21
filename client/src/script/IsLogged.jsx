const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
    const isLogged = await fetch(backendUrl + '/isLogged', {
      credentials: 'include',
    });
    await isLogged.json()
