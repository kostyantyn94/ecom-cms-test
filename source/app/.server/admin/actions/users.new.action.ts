import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {usersNewFormValidator} from '~/admin/components/UsersNewForm/UsersNewForm.validator';
import {prisma} from '~/.server/shared/utils/prisma.util';
import {$Enums} from '@prisma/client';

export async function adminUsersNewAction({request}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  // validate form data
  const data = await usersNewFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {email, password, lastName, firstName, role} = data.data;

  // check unique email
  const exist = await prisma.user.findFirst({where: {email}});
  if (exist) {
    return validationError({
      fieldErrors: {
        email: 'User already exists'
      }
    });
  }

  // create new User
  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      fullName: `${firstName} ${lastName}`,
      role: role as $Enums.AdminRole
    }
  });

  return redirect(`${EAdminNavigation.users}/${newUser.id}`);
}
