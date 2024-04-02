import supabase from './spb/dir/supabase';

export async function userSignup({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function userSignout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updateUserProfile(name: string, password: string) {
  let query = await supabase.auth.updateUser({
    data: { name },
  });

  if (password.length >= 6) {
    query = await supabase.auth.updateUser({
      password,
      data: { name },
    });
  }

  const { data, error } = query;

  if (error) throw new Error(error.message);

  return data;
}
