SELECT
  `u`.`username` AS `username`,
  `u`.`image_path` AS `user_image`,
  `b`.`title` AS `title`,
  `b`.`image_path` AS `book_image`,
  `g`.`name` AS `genre`,
  `c`.`rating` AS `rating`,
  `c`.`review` AS `review`,
  `s`.`type` AS `status`,
  `c`.`created_date` AS `created_date`,
  `c`.`updated_date` AS `updated_date`,
  `l`.`name` AS `list`,
  `u`.`id` AS `userId`,
  `b`.`id` AS `bookId`,
  `c`.`id` AS `collectionId`,
  `g`.`id` AS `genreId`,
  `s`.`id` AS `statusId`,
  `l`.`id` AS `listId`
FROM
  (
    (
      (
        (
          (
            (
              `bookconnect`.`collection` `c`
              JOIN `bookconnect`.`user` `u` ON((`c`.`userId` = `u`.`id`))
            )
            JOIN `bookconnect`.`book` `b` ON((`c`.`bookId` = `b`.`id`))
          )
          JOIN `bookconnect`.`state` `s` ON((`s`.`id` = `c`.`stateId`))
        )
        JOIN `bookconnect`.`genre` `g` ON((`b`.`genreId` = `g`.`id`))
      )
      LEFT JOIN `bookconnect`.`collection_list` `cl` ON((`c`.`id` = `cl`.`collectionId`))
    )
    LEFT JOIN `bookconnect`.`list` `l` ON((`cl`.`listId` = `l`.`id`))
  )